import getValue from 'lodash/get';
import setValue from 'lodash/set';
import orderBy from 'lodash/orderBy';

import {
    ref
} from 'vue';

function parseResponseData(list, [attrs, orders]) {
    list.forEach(item => {
        if (typeof attrs === 'string') {
            attrs = [attrs];
            orders = [orders];
        }
        attrs.forEach(attr => {
            const dateStr = getValue(item, attr);
            if (dateStr === null || dateStr === undefined) {
                return;
            }
            if (typeof dateStr === 'string' && isNaN(dateStr)) {
                const date = new Date(dateStr);
                if (isFinite(date)) {
                    setValue(item, attr, date);
                }
            }
        });
    });
    return orderBy(list, attrs, orders);
}

export function useRequest({initStatus = 'loading', changeStatusAfterAllSettled = false} = {}) {
    const status = ref(initStatus);
    let allDone;
    if (changeStatusAfterAllSettled) {
        allDone = function() {
            status.value = 'success';
        };
    }
    async function doRequest(requests, responsesArgs, iteratees) {
        const isArray = Array.isArray(requests);
        if (!isArray) {
            requests = [requests];
            responsesArgs = [responsesArgs];
            iteratees = [iteratees];
        }
        if (responsesArgs && requests.length !== responsesArgs.length) {
            throw new Error(`requests(${requests.length}) and responsesArgs(${responsesArgs.length}) length are not equal.`);
        }
        status.value = 'loading';
        try {
            const responseList = await Promise.all(requests);
            if (!allDone) {
                status.value = 'success';
            }

            const dataList = responseList.map((response, index) => {
                let {data} = response;
                if (responsesArgs?.[index]) {
                    const args = responsesArgs[index];
                    if (Array.isArray(args)) {
                        data = parseResponseData(data, args);
                    } else {
                        Object.entries(args).forEach(([attr, args]) => {
                            const list = data[attr];
                            data[attr] = parseResponseData(list, args);
                        });
                    }
                }
                return data;
            });
            if (iteratees) {
                await Promise.all(responseList.map((response, index) => {
                    if (iteratees[index]) {
                        return iteratees[index](response, index);
                    }
                }));
            }
            return !isArray ? dataList[0] : dataList;
        } catch (error) {
            status.value = 'fail';
            if (error.__handled) {
                throw error;
            }
            const {
                response
            } = error;
            if (response) {
                error.status = response.status;
                error.data = response.data.error;
            }
            throw error;
        }
    }

    return {status, doRequest, allDone};
}
