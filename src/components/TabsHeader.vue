<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button text="Previous" :icon="caretBack"></ion-back-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <ion-button>
                    <ion-icon slot="icon-only" :icon="search"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
</template>
<script setup>
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
} from '@ionic/vue';
import {
    caretBack,
    search,
} from 'ionicons/icons';

defineProps({
    title: {
        type: String,
        required: true,
    }
});
</script>
