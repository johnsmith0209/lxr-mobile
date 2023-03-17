
<template>
    <ion-page>
        <tabs-header
            title="messages"
        />
        <ion-content>
            <div class="d-flex flex-column">
                <span>
                    Current user sign in: {{ currentUser ? currentUser.name : 'not sign in' }}
                </span>
                <ion-button @click="onSignOut">
                    Sign out
                </ion-button>
                <ion-button color="success" @click="onRefreshUser">
                    Refresh
                </ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    onMounted,
    ref,
} from 'vue';
import {
    IonPage,
    IonContent,
    IonButton,
    loadingController,
    alertController,
} from '@ionic/vue';
import {
    userApi,
} from 'wf-apis';
import {
    useRequest,
} from '@/composables/Request';
import {
    jwtStorage
} from '@/utils/index';
import TabsHeader from '@/components/TabsHeader.vue';

// const cookie = document.cookie;
let currentUser = ref();
const {
    // status,
    doRequest: getUserRequest
} = useRequest({initStatus: 'success'});
onMounted(async() => {
    onRefreshUser();
});

async function onSignOut() {
    jwtStorage.delete();

    const alert = await alertController.create({
        header: 'SignOut',
        message: 'Sign out successfully!',
        buttons: ['OK'],
    });

    await alert.present();
    await alert.onDidDismiss();
    currentUser.value = null;
}

async function onRefreshUser() {
    const loading = await loadingController.create({
        message: 'Loading user info',
        spinner: 'bubbles',
        duration: 500, // fixed for displaying loading
    });
    const jwt = await jwtStorage.get();
    console.log({jwt});
    if (jwt) {
        try {
            loading.present();
            const userData = await getUserRequest(userApi.getCurrent());
            // console.log('user Data', userData);
            currentUser.value = userData;
        } catch (error) {
            console.error(error);
        }
    } else {
        const alert = await alertController.create({
            header: 'Can not get user info',
            message: 'Jwt is empty!',
            buttons: ['OK'],
        });


        await alert.present();
    }
}
</script>
