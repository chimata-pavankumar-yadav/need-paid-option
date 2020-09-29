import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ToastAndroid, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];

}

function CustomHead({ navigation, header }) {
  return (
    <View style={{ flexDirection: 'row', height: 60, borderWidth: 1, borderColor: '#101010' }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
        <Ionicons name="md-arrow-round-back" size={28} color="yellowgreen" />
      </TouchableOpacity>

      <View style={{ flex: 1.5, alignItems: 'center' }}><Text style={{ fontSize: 21, fontWeight: 'bold', color: 'red' }}>{header}</Text></View>
      <View style={{ flex: 1 }}></View>

    </View>
  )
}


export default function Members({ route, navigation }) {

  const db = SQLite.openDatabase("detailss.db");
  const detail = route.params;
  const [newdetail, setNewdetail] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from itemson GROUP BY place ;`,
        [],
        (_, { rows: { _array } }) => setNewdetail(_array),
      );


    });
  }, []);

  const showToastNoData = () => {

    ToastAndroid.show("No Data To Refresh", ToastAndroid.SHORT);
  };
  const showToastError = () => {
    ToastAndroid.show("Data Error", ToastAndroid.SHORT);
  };
  const showToastRefreshed = () => {
    ToastAndroid.show("Data Refreshed", ToastAndroid.SHORT);
  };

  return (

    <View style={{ flex: 1, backgroundColor: '#101010' }}>
      <View style={{ marginTop: Constants.statusBarHeight, flex: 1, marginBottom: 30 }}>
        <CustomHead navigation={navigation} header={'Total Members'} />

        <FlatList
          data={newdetail}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.text} onPress={() => navigation.navigate('Indiviplace', item.place)} >

              <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>{item.place}</Text>

            </TouchableOpacity>
          )}
          keyExtractor={(item) => (item.id).toString()}
        />
      </View>

    </View >

  );
}

const styles = StyleSheet.create({

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

});




/*

 var stahour = choosedatestarthour
    var staminutes = choosedatestartminutes

    var stohour = choosedatestophour
    var stominutes = choosedatestopminutes

    if (stahour > stohour) {
      var thour = (stohour + 12) - stahour

    } else {
      var thour = stohour - stahour

    }

    if (staminutes > stominutes) {
      var tminutes = staminutes - stominutes

    } else {
      var tminutes = stominutes - staminutes

    }

    db.transaction(
      tx => {
        tx.executeSql('UPDATE ' + '' + personname + '' + ' set hour=?, minutes=?  where id=?',
          [thour, tminutes, nid]);

        tx.executeSql(
          `select * from ` + `` + personname + `` + ` ;`,
          [],
          (_, { rows: { _array } }) => setNewdetai(_array),
        );

        tx.executeSql("insert into Totaltme (startime,stotime) values (?, ?)",
          [thour, tminutes]);

        tx.executeSql(
          `select * from Totaltme ;`,
          [],
          (_, { rows: { _array } }) => setNewtotaltime(_array),
        );
      },

      setModeltime(true),
      forceUpdate

    );

    onPressItem && onPressItem(0)
  }


 <View style={{ flex: 1.1, flexDirection: 'row', justifyContent: 'center', }}>
                <TouchableOpacity style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 15, }}>
                    {item.hour.slice(0, 2).split('.')}h:{item.minutes.slice(0, 2).split('.')}m
                   </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => [setModeltime(true), setNid(item.id)]}>
                  <Ionicons name="md-add" size={32} color="yellowgreen" />
                </TouchableOpacity>

              </View>


        <Formik
                initialValues={{ twowheel: '', fourwheel: '' }}
                validationSchema={errorhandlertwo}
                onSubmit={(values, actions) => {
                  timedata(values);

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
*/