<template>
    <div>
        <ion-segment @ion-change="onActionChange" :value="actionType">
            <ion-segment-button :value="ACTION.SIGN_IN">
                <ion-label>Sign In</ion-label>
            </ion-segment-button>
            <ion-segment-button :value="ACTION.SIGN_UP">
                <ion-label>Sign Up</ion-label>
            </ion-segment-button>
        </ion-segment>

        <ion-item>
            <ion-label position="floating">User Name / Phone Number</ion-label>
            <ion-input v-model="accountName" clear-input placeholder="Enter text"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" clear-input type="password" placeholder="Enter password"></ion-input>
        </ion-item>

        <ion-button class="bottom-button" :disabled="signInDisabled" v-if="actionType === ACTION.SIGN_IN" @click="onSignIn" expand="block">Sign In</ion-button>
        <ion-button class="bottom-button" v-if="actionType === ACTION.SIGN_UP" @click="onSignUp" expand="block">Sign Up</ion-button>
    </div>
</template>
<script setup>
import {
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonSegment,
    IonSegmentButton,
    alertController,
} from '@ionic/vue';
import {
    ref,
    unref,
    computed,
} from 'vue';
import {
    accountApi,
} from 'wf-apis';
import {
    useRequest,
} from '@/composables/Request';
import {
    CapacitorCookies
} from '@capacitor/core';
import {
    jwtStorage,
} from '@/utils';

const ACTION = {
    SIGN_IN: 'SignIn',
    SIGN_UP: 'SignUp',
};

const actionType = ref(ACTION.SIGN_IN);
const accountName = ref('');
const password = ref('');

const {
    status: signInStatus,
    doRequest: signInRequest,
} = useRequest({initStatus: 'success'});

const signInDisabled = computed(() => signInStatus.value === 'loading');

function onActionChange(event) {
    actionType.value = event.detail.value;
}

async function onSignIn() {
    const accountNameValue = unref(accountName);
    const passwordValue = unref(password);
    try {
        await signInRequest(accountApi.signInByAccount(accountNameValue, passwordValue), undefined, async() => {
            // 省的自己解析set-cookie了
            const {jwt} = await CapacitorCookies.getCookies();
            jwtStorage.set(jwt);

        });
        const alert = await alertController.create({
            header: 'Account',
            subHeader: 'Sign in done',
            message: 'Sign In!',
            buttons: ['OK'],
        });
        await alert.present();
    } catch (error) {
        console.error(error);
        const alert = await alertController.create({
            header: 'Account',
            subHeader: 'Important message',
            message: 'Sign In!',
            buttons: ['OK'],
        });

        await alert.present();
    }
}

async function onSignUp() {
    const alert = await alertController.create({
        header: 'Alert',
        subHeader: 'Important message',
        message: 'Sign Up!',
        buttons: ['OK'],
    });

    await alert.present();
}
</script>
