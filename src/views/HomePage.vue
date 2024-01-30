<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <ion-button fill="clear">
          <ion-icon slot="icon-only" :icon="calendarOutline"></ion-icon>
        </ion-button>
        <h1>This Week</h1>
        <div>
          <p>{{ monthName }}, {{ year }}</p>
          <ion-button fill="clear" @click="updateMonth(-1)">
            <ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
          </ion-button>
          <ion-button fill="clear" @click="updateMonth(1)">
            <ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
          </ion-button>
          <div>
            <ul class="flex flex-wrap">
              <li class="w-[calc(100%/7)]" v-for="day in daysOfWeek">
                {{ day }}
              </li>
            </ul>

            <ul class="flex flex-wrap">
              <li
                class="w-[calc(100%/7)]"
                :class="{ current: n.month === 'selected' }"
                v-for="n in updateDatelist"
              >
                <button @click="updateDate(n.date, n.month)">
                  {{ n.date }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p>{{ monthName }}, {{ year }}</p>
        </div>
      </div>
      <div>
        <div v-for="(n, index) in updateWeekList">
          <p>{{ daysOfWeek[index] }}</p>
          <p>{{ n.date }}</p>
        </div>
      </div>
      <div>
        <div v-for="(item, i) in mealSchedule">
          <p>{{ item.time }}</p>
          <!-- <template v-for="(input, j) in item.foods">
            <input class="bg-slate-400" type="text" v-model="g[i].foods[j]" />
          </template> -->

          <input
            class="bg-slate-400"
            type="text"
            v-model="item.foods[item.foods.length - 1]"
          />

          <ion-button
            @click="updateFoodList(item.time, item.foods[0])"
            fill="clear"
          >
            <ion-icon
              class="dropdown-button"
              slot="icon-only"
              :icon="addOutline"
            ></ion-icon>
          </ion-button>
          <div v-for="food in item.foods">
            <p v-if="food != ''">{{ food }}</p>
          </div>
        </div>
        <!-- <p>{{ selectedDate }} {{ selectedMonth }} {{ selectedYear }}</p> -->
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button fill="clear">
          <ion-icon slot="icon-only" :icon="restaurantOutline"></ion-icon>
        </ion-button>
        <ion-button fill="clear">
          <ion-icon slot="icon-only" :icon="calendarClearOutline"></ion-icon>
        </ion-button>
        <ion-button fill="clear">
          <ion-icon slot="icon-only" :icon="basketOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import {
  calendarOutline,
  addOutline,
  restaurantOutline,
  calendarClearOutline,
  basketOutline,
  chevronForwardOutline,
  chevronBackOutline,
} from "ionicons/icons";
import { ref, computed, watch } from "vue";
import information from "@/database/test.json";
import { useIonRouter } from "@ionic/vue";
import { usePlanner } from "@/composables/usePlanner";

const ionRouter = useIonRouter();

const {
  monthName,
  year,
  daysOfWeek,
  selectedTime,
  selectedDate,
  selectedMonth,
  selectedYear,
  updateDatelist,
  updateWeekList,
  updateMonth,
  updateDate,
} = usePlanner();

const keyName = computed(() => {
  return `${String(selectedDate.value)}${String(selectedMonth.value)}${String(
    selectedYear.value
  )}`;
});

const mealSchedule = ref(JSON.parse(localStorage.getItem(keyName.value)) ?? [
    {
      time: "Breackfast",
      foods: [""],
    },
    {
      time: "Brunch",
      foods: [""],
    },
    {
      time: "Lunch",
      foods: [""],
    },
    {
      time: "Snack",
      foods: [""],
    },
    {
      time: "Dinner",
      foods: [""],
    },
  ]
);

function updateFoodList(foodTime: string, input: string) {
  if (input === "") return;
  mealSchedule.value.forEach((element) => {
    if (element.time === foodTime) {
      element.foods.push("");
    }
  });

  localStorage.setItem(keyName.value, JSON.stringify(mealSchedule.value));
  console.log(
    JSON.stringify({
      date: new Date(),
      plan: mealSchedule.value,
    })
  );

  // const id = selectedTime;
  // if (name.value === "") return;

  // foodList.push({
  //   id: id,
  //   name: foodTime,
  //   recipe: name.value,
  // });
  // console.log(foodList[0]);
}
</script>
<style scoped>
.current {
  color: gray;
}
</style>
