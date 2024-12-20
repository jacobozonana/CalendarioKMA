import React, { useState, useEffect } from 'react';
import * as ExpoLocation from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { HDate, HebrewDateEvent, months, Zmanim, GeoLocation, HebrewCalendar, Event } from '@hebcal/core';
import tzLookup from 'tz-lookup';
import SunCalc from 'suncalc';

export default function App() {
  let dimensions = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  let meseHeb = ['', 'Nisan', 'Iyar', 'Sivan', 'Tamuz', 'Av', 'Elul', 'Tishre', 'Jeshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar', 'Adar II'];
  let mesesEsp = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  let [sunrise, setSunrise] = useState(null)
  let [sunset, setSunset] = useState(null)
  let [shkiah, setShkiah] = useState(null)
  let [sofZmanShmaMGA16Point1, setSofZmanShmaMGA16Point1] = useState(null)
  let [sofZmanShma, setSofZmanShma] = useState(null)
  let [sofZmanTfillaMGA16Point1, setSofZmanTfillaMGA16Point1] = useState(null)
  let [sofZmanTfilla, setSofZmanTfilla] = useState(null)
  let [chatzot, setChatzot] = useState(null)
  let [minchaGedola, setMinchaGedola] = useState(null)
  let [beinHaShmashos, setBeinHaShmashos] = useState(null)
  let [tzeit6_8, setTzeit6_8] = useState(null)
  let [tzeit7_083, setTzeit7_083] = useState(null)
  let [alotHaShachar, setAlotHaShachar] = useState(null)
  let [misheyakir, setMisheyakir] = useState(null)
  let [neitzHaChama, setNeitzHaChama] = useState(null)
  let [minchaKetana, setMinchaKetana] = useState(null)
  let [minchaKetanaMGA, setMinchaKetanaMGA] = useState(null)
  let [plagHaMincha, setPlagHaMincha] = useState(null)
  let [minchaGedolaMGA, setMinchaGedolaMGA] = useState(null)
  let [sofZmanShmaMGA19Point8, setSofZmanShmaMGA19Point8] = useState(null)
  let [seaLevelSunrise, setSeaLevelSunrise] = useState(null)

  // Set the locale to Spanish
  LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy',
  };

  LocaleConfig.defaultLocale = 'es';

  useEffect(() => {

    (async () => {

      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await ExpoLocation.getCurrentPositionAsync({
        accuracy: ExpoLocation.Accuracy.Highest,

      });

      setLocation(location);

    })();

  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // Function to handle date change
  const handleDateChange = (day) => {
    setSelectedDate(new Date(day.dateString));
  };

  // Custom component for each day
  const renderDayComponent = ({ date }) => {

    const hebDate = new HDate(new Date(date.year, date.month - 1, date.day))

    return (
      <TouchableOpacity onPress={() => { setSelectedDate(date) }} style={styles.dayContainer}>
        <Text style={styles.dayText}>{date.day}</Text>
        <Text style={styles.dateText}>{meseHeb[hebDate.getMonth()]} {hebDate.getDate()}</Text>
        {/* <View style={styles.legendContainer}>
          <Text style={styles.legendText}>Algo</Text>
        </View> */}
      </TouchableOpacity>
    );
  };


  useEffect(() => {

    if (location && selectedDate) {

      let latitude = 19.4335 // del kolel
      let longitude = -99.194 // del kolel

      // let latitude = location.coords.latitude
      // let longitude = location.coords.longitude

      const tzid = 'America/Mexico_City';
      // let tzid = tzLookup(latitude, longitude, function (err, tz) { return tz })

      // const day = new Date();
      const day = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
      const gloc = new GeoLocation(null, latitude, longitude, 0, tzid);
      const zmanim = new Zmanim(gloc, day, false);

      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.sunrise()), 'Sunrise....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.sunset()), 'Sunset....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.shkiah()), 'Shkiah....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanShmaMGA16Point1()), 'K.ShemaM.A....');
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanShma()), ' K.ShemaGRA....');
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanTfillaMGA16Point1()), 'Tefila M.A....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanTfilla()), 'Tefila GRA....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.chatzot()), 'Jatzot....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.minchaGedola()), 'Minja Gedola....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.beinHaShmashos()), 'Bein Ha Shmashot O Tzet Hacojabon de guemara....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.tzeit(6.8)), 'Tzet 6.8 grados....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.tzeit(7.083)), 'Tzet 7.083 grados....')
      // console.log('-------------------')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.alotHaShachar()), 'Alot HaShachar....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.misheyakir()), 'Zeman Talit Tefilin....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.neitzHaChama()), 'Neitz HaChama....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.minchaKetana()), 'Mincha Ketana....')
      // console.log(Zmanim.formatISOWithTimeZone(tzid, zmanim.plagHaMincha()), 'Plag HaMincha....')

      setSunrise(Zmanim.formatISOWithTimeZone(tzid, zmanim.sunrise()))
      setSunset(Zmanim.formatISOWithTimeZone(tzid, zmanim.sunset()))
      setShkiah(Zmanim.formatISOWithTimeZone(tzid, zmanim.shkiah()))
      setSofZmanShmaMGA16Point1(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanShmaMGA16Point1()))
      setSofZmanShmaMGA19Point8(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanShmaMGA19Point8()))
      setSofZmanShma(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanShma()))
      setSofZmanTfillaMGA16Point1(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanTfillaMGA16Point1()))
      setSofZmanTfilla(Zmanim.formatISOWithTimeZone(tzid, zmanim.sofZmanTfilla()))
      setChatzot(Zmanim.formatISOWithTimeZone(tzid, zmanim.chatzot()))
      setMinchaGedola(Zmanim.formatISOWithTimeZone(tzid, zmanim.minchaGedola()))
      setBeinHaShmashos(Zmanim.formatISOWithTimeZone(tzid, zmanim.beinHaShmashos()))
      setTzeit6_8(Zmanim.formatISOWithTimeZone(tzid, zmanim.tzeit(6.8)))
      setTzeit7_083(Zmanim.formatISOWithTimeZone(tzid, zmanim.tzeit(7.083)))
      setAlotHaShachar(Zmanim.formatISOWithTimeZone(tzid, zmanim.alotHaShachar()))
      setMisheyakir(Zmanim.formatISOWithTimeZone(tzid, zmanim.misheyakir()))
      setNeitzHaChama(Zmanim.formatISOWithTimeZone(tzid, zmanim.neitzHaChama()))
      setMinchaKetana(Zmanim.formatISOWithTimeZone(tzid, zmanim.minchaKetana()))
      setPlagHaMincha(Zmanim.formatISOWithTimeZone(tzid, zmanim.plagHaMincha()))
      setMinchaGedolaMGA(Zmanim.formatISOWithTimeZone(tzid, zmanim.minchaGedolaMGA()))
      setMinchaKetanaMGA(Zmanim.formatISOWithTimeZone(tzid, zmanim.minchaKetanaMGA()))
      setSeaLevelSunrise(Zmanim.formatISOWithTimeZone(tzid, zmanim.seaLevelSunrise()))


      //---------------------

      // const obtenerSalidaSol = (fecha, latitude, longitude) => {
      //   const times = SunCalc.getTimes(fecha, latitude, longitude, .90);
      //   return times.sunrise; // Hora de salida del sol
      // };

      // const data = fechas.map(fecha => {
      //   const salidaSol = obtenerSalidaSol(fecha, latitude, longitude);
      //   return {
      //     fecha: fecha.toDateString(),
      //     salidaSol: salidaSol.toLocaleTimeString()
      //   };
      // });


      // console.log(obtenerSalidaSol(day, latitude, longitude).toLocaleTimeString(), 'Salida del sol....');

      //---------------------

    }
  }, [location, selectedDate]);



  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.paragraph}>Calendario KMA</Text>

        <Calendar
          style={{ width: dimensions.width }}
          onDayPress={(day) => handleDateChange(day)}
          dayComponent={renderDayComponent}
          theme={{
            textSectionTitleColor: 'black',
            selectedDayBackgroundColor: 'blue',
          }}
          renderHeader={(date) => (
            <View style={styles.headerContainer}>
              {/* que salgan los 2  meses en hebreo que estan en la vista */}
              <Text style={styles.headerText}>{meseHeb[new HDate(new Date(date)).getMonth()]}</Text>
              <Text style={styles.headerText}>{mesesEsp[new Date(date).getMonth()]}</Text>
              <Text style={styles.subHeaderText}>{new Date(date).getFullYear()}</Text>
            </View>
          )}
        />
        {/* <Text style={styles.paragraph}>{text}</Text> */}
        <Text style={styles.paragraph}>Date: {selectedDate == null ? null : selectedDate.dateString}</Text>
        {/* <Text style={styles.paragraph}>Timezone: {!location ? null : tzLookup(location.coords.latitude, location.coords.longitude)}</Text> */}
        {/* <Text style={styles.paragraph}>Latitude: {!location ? null : location.coords.latitude}</Text>
        <Text style={styles.paragraph}>Longitude: {!location ? null : location.coords.longitude}</Text> */}
        {/* <Text style={styles.paragraph}>Altitude: {!location ? null : location.coords.altitude}</Text> */}
        <Text style={styles.paragraph}>Alot HaShachar: {!alotHaShachar ? null : alotHaShachar.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Misheyakir: {!misheyakir ? null : misheyakir.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Sunrise: {!sunrise ? null : sunrise.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Sea Level Sunrise: {!seaLevelSunrise ? null : seaLevelSunrise.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Neitz HaChama: {!neitzHaChama ? null : neitzHaChama.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Sunset: {!sunset ? null : sunset.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Shkiah: {!shkiah ? null : shkiah.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Sof Zman Shma MGA 16.1: {!sofZmanShmaMGA16Point1 ? null : sofZmanShmaMGA16Point1.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Sof Zman Shma GRA: {!sofZmanShma ? null : sofZmanShma.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Sof Zman Tefila MGA 16.1: {!sofZmanTfillaMGA16Point1 ? null : sofZmanTfillaMGA16Point1.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Sof Zman Tefila GRA 19.8: {!sofZmanShmaMGA19Point8 ? null : sofZmanShmaMGA19Point8.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Sof Zman Tefila GRA: {!sofZmanTfilla ? null : sofZmanTfilla.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Chatzot: {!chatzot ? null : chatzot.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Minja Gedola: {!minchaGedola ? null : minchaGedola.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Minja Gedola MGA: {!minchaGedolaMGA ? null : minchaGedolaMGA.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Minja Ketana: {!minchaKetana ? null : minchaKetana.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Minja Ketana MGA: {!minchaKetanaMGA ? null : minchaKetanaMGA.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Plag HaMinja: {!plagHaMincha ? null : plagHaMincha.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Bein HaShmashot: {!beinHaShmashos ? null : beinHaShmashos.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Tzet 6.8: {!tzeit6_8 ? null : tzeit6_8.split('T')[1].split('-')[0]}</Text>
        <Text style={styles.paragraph}>Tzet 7.083: {!tzeit7_083 ? null : tzeit7_083.split('T')[1].split('-')[0]}</Text>

      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    marginTop: 50,
    fontSize: 18,
    textAlign: 'center',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 80,
    height: 50,
    padding: 5,
  },
  dayText: {
    fontSize: 15,
    maxWidth: '100%',
    textAlign: 'center',
    padding: 3,
  },
  dateText: {
    fontSize: 9,
    color: 'red',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  legendText: {
    fontSize: 14,
    marginLeft: 5,
  },
});
