<template>
    <ion-page>
        <tabs-header
            :title="'Sign In & Sign Up'"
        />
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Sign In or Sign Up</ion-title>
                </ion-toolbar>
            </ion-header>

            <SignInAndUp class="d-flex flex-column justify-content-center h-75" />
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
} from '@ionic/vue';
import TabsHeader from '@/components/TabsHeader.vue';
import SignInAndUp from '@/components/SignInAndUp.vue';
</script>
