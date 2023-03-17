<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar #="bottom">
                <ion-tab-button tab="tab1" href="/tabs/messages">
                    <ion-icon :icon="albumsOutline" />
                    <ion-label>Messages</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab2" href="/tabs/dashboards">
                    <ion-icon :icon="libraryOutline" />
                    <ion-label>Dashboards</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab3" href="/tabs/screener">
                    <ion-icon :icon="telescopeOutline" />
                    <ion-label>Screener</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="tab4" href="/tabs/mine">
                    <ion-icon :icon="cogOutline" />
                    <ion-label>Mine</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script setup>
import {
    IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet
} from '@ionic/vue';
import {
    albumsOutline, libraryOutline,
    telescopeOutline, cogOutline,
} from 'ionicons/icons';
</script>
