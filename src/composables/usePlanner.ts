import { computed, ref } from "vue";

export function usePlanner() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const time = ref(new Date());
  const month = ref(time.value.getMonth());
  const year = ref(time.value.getFullYear());
  const monthName = computed(() => {
    return monthsOfYear[month.value];
  });

  const selectedTime = ref(new Date());
  const selectedDate = computed(() => {
    return selectedTime.value.getDate();
  });
  const selectedDay = computed(() => {
    return selectedTime.value.getDay();
  });
  const selectedMonth = computed(() => {
    return selectedTime.value.getMonth();
  });
  const selectedYear = computed(() => {
    return selectedTime.value.getFullYear();
  });

  const lastDateOfMonth = computed(() => {
    return new Date(year.value, month.value + 1, 0).getDate();
  });
  const lastDayOfMonth = computed(() => {
    return new Date(year.value, month.value, lastDateOfMonth.value).getDay();
  });
  const lastDateOfLastMonth = computed(() => {
    return new Date(year.value, month.value, 0).getDate();
  });
  const lastDayOfLastMonth = computed(() => {
    return new Date(
      year.value,
      month.value,
      lastDateOfLastMonth.value
    ).getDay();
  });
  const firstDayOfMonth = computed(() => {
    return new Date(year.value, month.value, 1).getDay();
  });

  let datelist: any[] = [];
  const updateDatelist = computed(() => {
    datelist = [];
    let nextmonthdate = 0;
    for (let i = 0; i < firstDayOfMonth.value; i++) {
      let prevdate = lastDateOfLastMonth.value - firstDayOfMonth.value + i + 1;
      datelist.push({ date: prevdate, month: "prev" });
    }
    for (let i = 1; i <= lastDateOfMonth.value; i++) {
      if (
        i === selectedDate.value &&
        selectedMonth.value === month.value &&
        selectedYear.value === year.value
      ) {
        datelist.push({ date: i, month: "selected" });
      } else {
        datelist.push({ date: i, month: "curr" });
      }
    }
    for (let i = lastDayOfMonth.value + 1; i < 7; i++) {
      nextmonthdate++;
      datelist.push({ date: nextmonthdate, month: "next" });
    }

    return datelist;
  });

  let weekList: any[] = [];
  const updateWeekList = computed(() => {
    weekList = [];
    let indexFirstDateOfWeek = 0;
    updateDatelist.value.forEach((item, index) => {
      if (item.date === selectedDate.value && item.month === 'selected') {
        indexFirstDateOfWeek = index - selectedDay.value;
      }
    });
    
    for (let i = 0; i < 7; i++) {
      weekList.push(updateDatelist.value[indexFirstDateOfWeek + i]);
    }

    return weekList;
  });

  function updateMonth(num: number) {
    month.value = month.value + num;
    if (month.value === -1) {
      updateYear(-1);
      month.value = 11;
    } else if (month.value === 12) {
      updateYear(1);
      month.value = 0;
    }
  }
  function updateYear(num: number) {
    const value = year.value + num;
    year.value = Math.min(Math.max(value, 1923), 2123);
  }
  function updateDate(date: number, status: string) {
    if (status === "curr") {
      selectedTime.value = new Date(year.value, month.value, date);
    } else if (status === "prev") {
      month.value = month.value - 1;
      selectedTime.value = new Date(year.value, month.value, date);
    } else if (status === "next") {
      month.value = month.value + 1;
      selectedTime.value = new Date(year.value, month.value, date);
    }
  }

  return {
    month,
    year,
    monthName,
    daysOfWeek,
    selectedTime,
    selectedDate,
    selectedMonth,
    selectedYear,
    updateDatelist,
    updateMonth,
    updateWeekList,
    updateDate,
  };
}
