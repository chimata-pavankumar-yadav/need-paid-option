import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Math, ActivityIndicator, Image, TextInput, Button, ScrollView, Alert, ToastAndroid, Keyboard, FlatList, Modal, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Formik } from 'formik';
import { BlurView } from 'expo-blur';
import * as yup from 'yup';
import * as SQLite from 'expo-sqlite';
import { MaterialIcons } from '@expo/vector-icons';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import moment from 'moment';



function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];

}

function Finalamount({ detai, twoprice, fourprice }) {
  const [mnny, setMnny] = useState(0);
  const [num, setNum] = useState(0);

  if (detai[num]) {
    if ((detai[num].wheeler) === '2') {

      setMnny(mnny + (detai[num].hour * (twoprice * 60)) + (detai[num].minutes * twoprice));
      setNum(num + 1);
    } else {
      setMnny(mnny + (detai[num].hour * (fourprice * 60)) + (detai[num].minutes * fourprice));
      setNum(num + 1);
    }
  }

  return (
    <View>
      <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', color: 'yellowgreen' }}>TOTAL AMOUNT :   {mnny}</Text>
    </View>
  )
}

function Separator() {
  return <View style={styles.separator} />;
}



export default function Tabletab({ personname, onPressItem, datee, mint, hrr }) {

  const db = SQLite.openDatabase("detailss.db");
  const [nid, setNid] = useState(null);
  const [newdetai, setNewdetai] = useState();
  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [modeltime, setModeltime] = useState(false);
  const [twowheelprice, setTwowheelprice] = useState(null);
  const [fourwheelprice, setFourwheelprice] = useState(null);
  const [sidebox, setSidebox] = useState(null);
  const [indivimodel, setIndivimodel] = useState(false);
  const [datevisiblitystart, setDatevisibilitystart] = useState(false);
  const [choosedatestarthour, setChoosedatestarthour] = useState('HH');
  const [choosedatestartminutes, setChoosedatestartminutes] = useState('MM');
  const [datevisiblitystop, setDatevisibilitystop] = useState(false);
  const [choosedatestophour, setChoosedatestophour] = useState('HH');
  const [choosedatestopminutes, setChoosedatestopminutes] = useState('MM');
  const [astarttimee, setAstarttimee] = useState(null);
  const [astoptimee, setAstoptimee] = useState(null);
  const [updatehour, setUpdatehour] = useState([{ hour: hrr }]);
  const [updateminutes, setUpdateminutes] = useState([{ minutes: mint }]);
  const [alltimearray, setAlltimearray] = useState([{ astarttime: 'starttime', astoptime: 'stoptime' }]);
  const [dateee, setDateee] = useState({ choosedate: datee[1] });
  const [ghrr, setGhrr] = useState(0);
  const [gmrr, setGmrr] = useState(0);

  const datecancelstart = () => {
    setDatevisibilitystart(false);
  }
  const dateconfirmstart = (date) => {

    if (moment(date).format('A') === 'AM') {
      if (parseInt(date.getHours()) === 0) {
        setChoosedatestarthour(date.getHours() + 12);
        setAstarttimee((date.getHours() + 12) + ':' + date.getMinutes());
      } else {
        setChoosedatestarthour(date.getHours());
        setAstarttimee(date.getHours() + ':' + date.getMinutes());
      }
    } else {
      if (parseInt(date.getHours()) === 12) {
        setChoosedatestarthour(date.getHours());
        setAstarttimee(date.getHours() + ':' + date.getMinutes());
      } else {
        setChoosedatestarthour(date.getHours() - 12);
        setAstarttimee((date.getHours() - 12) + ':' + date.getMinutes());
      }

    }
    setChoosedatestartminutes(date.getMinutes());
    datecancelstart();
  }

  const touchshowstart = () => {
    setDatevisibilitystart(true);
  }


  const datecancelstop = () => {
    setDatevisibilitystop(false);
  }
  const dateconfirmstop = (date) => {

    if (moment(date).format('A') === 'AM') {
      if (parseInt(date.getHours()) === 0) {
        setChoosedatestophour(date.getHours() + 12);
        setAstoptimee((date.getHours() + 12) + ':' + date.getMinutes());
      } else {
        setChoosedatestophour(date.getHours());
        setAstoptimee(date.getHours() + ':' + date.getMinutes());
      }
    } else {
      if (parseInt(date.getHours()) === 12) {
        setChoosedatestophour(date.getHours());
        setAstoptimee(date.getHours() + ':' + date.getMinutes());
      } else {
        setChoosedatestophour(date.getHours() - 12);
        setAstoptimee((date.getHours() - 12) + ':' + date.getMinutes());
      }

    }
    setChoosedatestopminutes(date.getMinutes());
    datecancelstop();
  }

  const touchshowstop = () => {
    setDatevisibilitystop(true);
  }


  const errorhandlertwo = yup.object({

    twowheel: yup.string().required(),
    fourwheel: yup.string().required(),

  })


  useEffect(() => {

    db.transaction(tx => {

      tx.executeSql(
        `select * from ` + `` + personname + `` + ` where id = ? ;`,
        [1],
        (_, { rows: { _array } }) => setSidebox(_array),
      );

      tx.executeSql(
        "create table if not exists wheeldeta (id integer primary key not null, twowheel int, fourwheel int);"
      );
      tx.executeSql(
        "create table if not exists dateee (id integer primary key not null, choosedate int);"
      );
      tx.executeSql(
        'create table if not exists ' + '' + personname + 'greentable' + '' + ' (id integer primary key not null, ghour int, gminutes int);'
      );
      tx.executeSql("insert into " + "" + personname + "greentable" + "" + " (ghour,gminutes) values (?,?)",
        [ghrr, gmrr]);
      tx.executeSql("insert into dateee (choosedate) values (?)",
        [dateee.choosedate]);
      tx.executeSql(
        `select ghour from ` + `` + personname + `greentable` + `` + ` where id = 1;`,
        [],
        (_, { rows: { _array } }) => setGhrr(parseInt(_array[0].ghour)),
      );
      tx.executeSql(
        `select gminutes from  ` + `` + personname + `greentable` + `` + ` where id = 1;`,
        [],
        (_, { rows: { _array } }) => setGmrr(parseInt(_array[0].gminutes)),
      );

      tx.executeSql(
        `select choosedate from dateee where id = 1;`,
        [],
        (_, { rows: { _array } }) => setDateee(_array ? _array[0].choosedate : dateee.choosedate),
      );

      tx.executeSql(
        'create table if not exists ' + '' + personname + dateee.choosedate + '' + ' (id integer primary key not null, astarttime int, astoptime int ,atotaltime int);'
      );

      tx.executeSql(
        `select * from ` + `` + personname + dateee.choosedate + `` + ` ;`,
        [],
        (_, { rows: { _array } }) => setAlltimearray(_array),
      );

      tx.executeSql("insert into wheeldeta (twowheel,fourwheel) values (?, ?)",
        [30, 40]);
      tx.executeSql(
        `select * from ` + `` + personname + `` + ` ;`,
        [],
        (_, { rows: { _array } }) => setNewdetai(_array),
      );
      tx.executeSql(
        `select * from wheeldeta where id = 1;`, [],
        (_, { rows: { _array } }) => setTwowheelprice(_array[0].twowheel),
      );
      tx.executeSql(
        `select * from wheeldeta where id = 1;`, [],
        (_, { rows: { _array } }) => setFourwheelprice(_array[0].fourwheel),
      );
      tx.executeSql(
        'create table if not exists  ddfun  (id integer primary key not null, mydd int);'
      );
      tx.executeSql("insert into  ddfun (mydd) values (?)",
        [datee]);
      tx.executeSql(
        `select mydd from  ddfun where id = 1;`, [],
        (_, { rows: { _array } }) => setDd(_array),
      );

    });

  }, []);

  if (dateee === null) {
    return false;
  }

  const sideboxfun = (data) => {
    setSidebox(0);
    db.transaction(tx => {
      tx.executeSql(
        `select * from ` + `` + personname + `` + ` where id = ? ;`,
        [data],
        (_, { rows: { _array } }) => setSidebox(_array),
      );
    });
  }


  const [dd, setDd] = useState(null);
  const timedata = (data, datatwo) => {


    if (datatwo !== undefined || datatwo) {
      db.transaction(
        tx => {
          tx.executeSql(
            'create table if not exists  ddfun (id integer primary key not null, mydd int);'
          );
          tx.executeSql('UPDATE ddfun set mydd=? where id=?',
            [datatwo, 1]);

          tx.executeSql(
            `select mydd from ddfun where id = 1 ;`,
            [],
            (_, { rows: { _array } }) => setDd(_array),
          );
          tx.executeSql(
            `select hour from ` + `` + personname + `` + ` where choosedate = ? ;`,
            [datatwo],
            (_, { rows: { _array } }) => setUpdatehour(_array),
          );

          tx.executeSql(
            `select minutes from ` + `` + personname + `` + ` where choosedate = ? ;`,
            [datatwo],
            (_, { rows: { _array } }) => setUpdateminutes(_array),
          );

        },

        setModeltime(false),
        forceUpdate
      );

    }

    var stahour = choosedatestarthour
    var staminutes = choosedatestartminutes
    var stohour = choosedatestophour
    var stominutes = choosedatestopminutes

    if (stahour > stohour) {
      var thour = (stohour + 12) - stahour

    } else {
      if (stahour < stohour && stominutes < staminutes) {
        var thour = stahour - stohour
        if (thour <= 0) {
          thour = 0
        } else {
          thour = stahour - stohour
        }
      } else {
        var thour = stahour - stohour
        if (thour <= 0) {
          thour = parseInt(thour.toString().slice(1, 2))
        } else {
          thour = stahour - stohour
        }
      }


    }

    if (staminutes === stominutes) {
      var tminutes = stominutes - staminutes

    } else {
      var tminutes = stominutes + (60 - staminutes)

      if (tminutes >= 60) {
        var err = parseInt((tminutes / 60).toString().slice(0, 1))

        var mrr = tminutes % 60

        thour = thour + err
        tminutes = mrr
      }
    }



    var atotaltimee = thour + ':' + tminutes
    if (updatehour === null && updateminutes === null) {
      return false;
    }

    var uhour = parseInt(updatehour[0].hour.slice(0, 1).split('.')) + thour
    var uminutes = parseInt(updateminutes[0].minutes.slice(0, 2).split('.')) + tminutes

    if (uminutes >= 60) {
      var err = parseInt((uminutes / 60).toString().slice(0, 1))
      var mrr = uminutes % 60
      uhour = uhour + err
      uminutes = mrr
    }

    var gfh = parseInt(thour) + ghrr
    var gfm = parseInt(tminutes) + gmrr

    if (gfm >= 60) {
      var err = parseInt((gfm / 60).toString().slice(0, 1))
      var mrr = gfm % 60
      gfh = gfh + err
      gfm = mrr
    }
    db.transaction(
      tx => {
        if (data === 1) {
          tx.executeSql(
            'create table if not exists ' + '' + personname + datatwo[1] + '' + ' (id integer primary key not null, astarttime int, astoptime int ,atotaltime int);'
          );

          tx.executeSql(
            `select * from ` + `` + personname + datatwo[1] + `` + ` ;`,
            [],
            (_, { rows: { _array } }) => setAlltimearray(_array),
          );
        } else {
          tx.executeSql('UPDATE  ' + '' + personname + 'greentable' + '' + ' set ghour=?, gminutes=?  where id=?',
            [gfh, gfm, 1]);
          tx.executeSql('UPDATE dateee set choosedate =? where id =? ',
            [(dd[0].mydd[1]), 1]);

          tx.executeSql('UPDATE ' + '' + personname + '' + ' set hour=?, minutes=?  where id=?',
            [uhour, uminutes, nid]);

          tx.executeSql(
            `select * from ` + `` + personname + `` + ` ;`,
            [],
            (_, { rows: { _array } }) => setNewdetai(_array),
          );

          tx.executeSql("insert into " + "" + personname + dd[0].mydd[1] + "" + " (astarttime,astoptime,atotaltime) values (?,?, ?)",
            [astarttimee, astoptimee, atotaltimee]);
          tx.executeSql(
            `select * from ` + `` + personname + dd[0].mydd[1] + `` + ` ;`,
            [],
            (_, { rows: { _array } }) => setAlltimearray(_array),
          );
          onPressItem && onPressItem(0)
        }

      },

      setModeltime(false),
      forceUpdate
    );


  }


  const wheeldata = (data) => {
    db.transaction(
      tx => {
        tx.executeSql('UPDATE wheeldeta set twowheel=?, fourwheel=?  where id=?',
          [data.twowheel, data.fourwheel, 1]);

        tx.executeSql(
          `select * from wheeldeta where id = 1 ;`,
          [],
          (_, { rows: { _array } }) => setTwowheelprice(_array[0].twowheel),
        );

        tx.executeSql(
          `select * from wheeldeta where id = 1 ;`,
          [],
          (_, { rows: { _array } }) => setFourwheelprice(_array[0].fourwheel),
        );

      },

      console.log('data added'),
      forceUpdate

    );

    onPressItem && onPressItem(0)
  }



  const [clor, setClor] = useState(0);
  const [plus, setPlus] = useState(true);
  console.log(ghrr, gmrr)
  if (fourwheelprice === null) {
    return false;
  }



  return (
    <View>
      <View style={{ marginBottom: 40, height: 30 }}>

        <View style={{ marginBottom: 30, flex: 1, marginLeft: 15 }}>
          <Text style={{ color: 'yellowgreen', fontWeight: 'bold', fontSize: 15 }}>TOTAL TIME         : {ghrr}H : {gmrr}M</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 15, }}>

          <Finalamount detai={newdetai} twoprice={twowheelprice} fourprice={fourwheelprice} />

        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
        <View style={{ padding: 10, flex: 1.5, marginRight: 20, borderWidth: 1, borderColor: '#2C3335', borderRadius: 7, alignItems: 'center', backgroundColor: 'black' }}>
          <Text style={{ color: 'white' }}>Two Wheeler cost/minute    -  <Text style={{ color: 'yellowgreen', fontWeight: 'bold', fontSize: 18 }}>{twowheelprice}</Text> </Text>
          <Text style={{ color: 'white' }}>Four Wheeler cost/minute   -  <Text style={{ color: 'yellowgreen', fontWeight: 'bold', fontSize: 18 }}>{fourwheelprice}</Text></Text>
        </View>

        <TouchableOpacity onPress={() => setIndivimodel(true)} style={{
          flex: 1, height: 35, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderRadius: 7, backgroundColor: 'white',
        }}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
            change price
          </Text>
        </TouchableOpacity>

      </View>


      <FlatList
        data={newdetai}
        renderItem={({ item }) => (

          <View >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', flex: .3, marginBottom: 7 }}>

                <TouchableOpacity onPress={() => [sideboxfun(item.id), setPlus(false), setClor(item.id), timedata(1, item.choosedate)]}

                  style={{
                    flex: .7, backgroundColor: clor === item.id ? '#2475B0' : 'black', borderRadius: 6, borderWidth: 1, borderColor: clor === item.id ? '#2475B0' : '#2C3335',
                    justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 40
                  }
                  }>
                  <Text style={{ color: clor === item.id ? 'black' : '#DAE0E2', fontWeight: 'bold', fontSize: clor === item.id ? 17 : 15, }}>
                    {item.choosedate}
                  </Text>
                </TouchableOpacity>
                <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center', }}>
                  <TouchableOpacity
                    key={item.id}

                    onPress={() =>
                      Alert.alert(
                        "DELETE PERSON",
                        ("delete "),
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          {
                            text: "DELETE", onPress: () =>
                              onPressItem && onPressItem(item.id)

                          }

                        ],
                        { cancelable: false }
                      )

                    }
                  >


                    <MaterialIcons name="delete" size={20} color="gray" />

                  </TouchableOpacity>

                </View>
              </View>
            </View>

          </View>
        )}
        keyExtractor={(item) => (item.id).toString()}
      />
      <View style={{ width: 245, marginLeft: 135, marginTop: 150, borderRadius: 5, borderColor: '#2C3335', borderWidth: 1, position: 'absolute', backgroundColor: 'black', height: 430 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={sidebox}
            renderItem={({ item }) => (
              <View style={{ marginTop: 20, marginLeft: 10, }} >

                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Wheeler   :  {item.wheeler}</Text>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Advance   :  {item.advance}</Text>

                {((item.wheeler) === '2')
                  ?
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    Amount    :   {(item.hour * (twowheelprice * 60) + item.minutes * twowheelprice) - item.advance}
                  </Text>
                  :
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    Amount    :   {(item.hour * (fourwheelprice * 60) + item.minutes * fourwheelprice) - item.advance}
                  </Text>}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                      TotalTime :  {item.hour.slice(0, 2).split('.')}h:{item.minutes.slice(0, 2).split('.')}m
                   </Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={plus} style={{ flex: .5, justifyContent: 'center', }} onPress={() => [setModeltime(true), setNid(item.id)]}>
                    <Ionicons name="md-add" size={32} color={plus ? 'black' : 'gray'} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => (item.id).toString()}
          />
        </View>
        <View style={{ flex: 2, backgroundColor: 'black' }}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }}>START TIME</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }}>STOP TIME</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ color: 'gray', fontSize: 13, fontWeight: 'bold' }}>TOTAL TIME</Text>
            </View>
          </View>
          <Separator />
          <FlatList
            data={alltimearray}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 16, }}>{item.astarttime}</Text>
                </View>
                <View style={{ flex: .2, alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}> -- </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 16, }}>{item.astoptime}</Text>
                </View>
                <View style={{ flex: .3, alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}> --> </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 16, }}>{item.atotaltime}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => (item.id).toString()}
          />
        </View >
      </View>


      <Modal visible={indivimodel} transparent={true} animationType={'slide'}>
        <BlurView intensity={200} tint='dark' style={[StyleSheet.absoluteFill, { height: 300, marginTop: 150, marginBottom: 200, marginLeft: 20, marginRight: 20, borderRadius: 10 }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 4 }}>

            </View>
            <View style={{ flex: .5 }}>
              <TouchableHighlight onPress={() => setIndivimodel(!indivimodel)} style={{ alignItems: 'flex-end' }}>
                <Entypo name="cross" size={40} color="red" />
              </TouchableHighlight>
            </View>
          </View>

          <View>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 28 }}>Enter New Price / minute</Text>
            <Formik
              initialValues={{ twowheel: '', fourwheel: '' }}
              validationSchema={errorhandlertwo}
              onSubmit={(values, actions) => {
                wheeldata(values);
                actions.resetForm();
              }}
            >
              {(props) => (
                <View style={{ paddingLeft: 28, paddingRight: 28 }}>
                  <View style={{ flexDirection: 'row', marginBottom: 10, height: 50, }}>
                    <View style={{ flex: 1, }}>
                      <TextInput
                        style={[styles.textinput, { alignItems: 'center', color: 'white', backgroundColor: '#191919', marginRight: 5, textAlign: 'center', borderRadius: 7, }]}
                        placeholder={' 2-wheeler'}
                        onChangeText={props.handleChange('twowheel')}
                        value={props.values.twowheel}
                        keyboardType='numeric'
                      />
                    </View>


                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[styles.textinput, { marginBottom: 30, marginLeft: 5, color: 'white', backgroundColor: '#191919', textAlign: 'center' }]}
                        placeholder={'4-Wheeler'}
                        onChangeText={props.handleChange('fourwheel')}
                        value={props.values.fourwheel}
                        keyboardType='numeric'
                      />
                    </View>

                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 10, color: 'white' }}>{props.touched.twowheel && props.errors.twowheel}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 10, color: 'white' }}>{props.touched.fourwheel && props.errors.fourwheel}</Text>
                    </View>
                  </View>

                  <View style={{ marginTop: 30 }}>
                    <Button title="Submit" color='yellowgreen' onPress={props.handleSubmit} />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </BlurView>
      </Modal>




      <Modal visible={modeltime} transparent={true} animationType={'slide'}>
        <BlurView intensity={200} tint='dark' style={[StyleSheet.absoluteFill, { height: 300, marginTop: 150, marginBottom: 200, marginLeft: 20, marginRight: 20, borderRadius: 10 }]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 4 }}>

            </View>
            <View style={{ flex: .5 }}>
              <TouchableHighlight onPress={() => setModeltime(!modeltime)} style={{ alignItems: 'flex-end' }}>
                <Entypo name="cross" size={40} color="red" />
              </TouchableHighlight>
            </View>
          </View>

          <View>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 28 }}>Enter Time Details</Text>
            <Formik
              initialValues={{ twowheel: '', fourwheel: '' }}
              onSubmit={(values, actions) => {
                timedata(2);

              }}
            >
              {(props) => (
                <View style={{ paddingLeft: 28, paddingRight: 28 }}>
                  <View style={{ marginBottom: 40, height: 40, }}>
                    <View style={{ flex: 1, marginBottom: 60 }}>


                      <DateTimePickerModal
                        isVisible={datevisiblitystart}
                        onConfirm={dateconfirmstart}
                        onCancel={datecancelstart}
                        mode={'time'}
                        isDarkModeEnabled={true}
                      />
                      <View style={{ flexDirection: 'row', height: 40, marginBottom: 15, backgroundColor: '#191919', borderWidth: 1, borderBottomColor: 'white', borderRadius: 7 }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={touchshowstart}><Text style={{ fontSize: 20, color: 'white' }}>Start Time :</Text></TouchableOpacity>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{choosedatestarthour + ':' + choosedatestartminutes}</Text></View>
                      </View>

                    </View>

                    <View style={{ flex: 1 }}>
                      <DateTimePickerModal
                        isVisible={datevisiblitystop}
                        onConfirm={dateconfirmstop}
                        onCancel={datecancelstop}
                        mode={'time'}
                        isDarkModeEnabled={true}

                      />
                      <View style={{ flexDirection: 'row', height: 40, marginBottom: 15, backgroundColor: '#191919', borderWidth: 1, borderBottomColor: 'white', borderRadius: 7 }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={touchshowstop}><Text style={{ fontSize: 20, color: 'white' }}>Stop Time :</Text></TouchableOpacity>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{choosedatestophour + ':' + choosedatestopminutes}</Text></View>
                      </View>
                    </View>

                  </View>


                  <TouchableOpacity style={{ marginTop: 40, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellowgreen', borderRadius: 7 }} onPress={props.handleSubmit}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>SUBMIT</Text>
                  </TouchableOpacity>


                </View>
              )}
            </Formik>
          </View>
        </BlurView>
      </Modal>
    </View>

  )
}


const styles = StyleSheet.create({
  separator: {
    marginBottom: 10,
    marginHorizontal: 2,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },

  textinput: {
    borderBottomWidth: 2,
    borderColor: 'white',
    height: 40,
    marginBottom: 0,
    color: 'white',

  },
  text: {
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'white',
    borderRadius: 7,
    shadowColor: 'white',
    shadowOffset: {
      width: 1, height: 7
    },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  textt: {
    marginTop: 5,
    borderBottomColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'black',
    borderRadius: 20,
    shadowColor: 'white',
    shadowOffset: {
      width: 1, height: 7
    },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },

  latest: {
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 0,
    alignItems: 'center',
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'yellowgreen',
    borderRadius: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 1, height: 7
    },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  nonBlurredContent: {
    alignItems: 'center',
    justifyContent: 'center',

  },
});