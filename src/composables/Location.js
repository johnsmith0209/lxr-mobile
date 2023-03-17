import moment from 'moment';
import {
    reactive,
    watch
} from 'vue';
import {
    useRoute,
    useRouter,
} from 'vue-router';

import {
    PageStateManager,
} from '@lxr/common-fe/lib/service';

export function useLocation(stateSchema, {enableDateRange, defaultDiffYears, storeNamespace} = {}) {
    if (enableDateRange) {
        if (!defaultDiffYears) {
            throw new Error('Args defaultDiffYears is required.');
        }
        Object.assign(stateSchema, {
            startDate: {
                type: Date,
                format: 'YYYY-MM-DD',
            },
            endDate: {
                type: Date,
                format: 'YYYY-MM-DD',
                defaultValue: new Date(),
                ...(storeNamespace ? {
                    storeConfig: {
                        type: 'session',
                        namespace: storeNamespace,
                    }
                } : null)
            },
            daysDiff: {
                type: Number,
                hideInQuery: true,
                defaultValue: moment().diff(moment().subtract(defaultDiffYears, 'years'), 'days'),
                ...(storeNamespace ? {
                    storeConfig: {
                        type: 'local',
                        namespace: storeNamespace,
                    }
                } : null)
            }
        });
    }
    const query = reactive({});
    const $router = useRouter();
    const $route = useRoute();

    function syncLocation() {
        PageStateManager.syncFromState(query, $route.query, stateSchema);
        if ((!$route.query['start-date'] || $route.query['start-date'] >= $route.query['end-date']) && query.endDate && query.daysDiff) {
            query.startDate = moment(query.endDate).subtract(query.daysDiff, 'days').toDate();
        }
    }

    function saveLocation() {
        PageStateManager.syncToStore(query, stateSchema);
        $router.replace({
            query: PageStateManager.getQueryObj(query, stateSchema)
        });
    }

    syncLocation();

    watch(query, () => {
        if (enableDateRange) {
            const newStartDateStr = query.startDate;
            const newEndDateStr = query.endDate;
            if (newEndDateStr <= newStartDateStr) {
                return;
            }
            query.daysDiff = moment(newEndDateStr).diff(moment(newStartDateStr), 'days', true);
        }
        saveLocation();
    }, {deep: true});

    return {
        query,
        saveLocation,
    };
}
