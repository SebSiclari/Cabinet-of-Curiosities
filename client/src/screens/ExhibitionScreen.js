import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';

import ExhibitionItem from '../components/ExhibitionItem';

const ExhibitionScreen = ({ exhibitionData, setCurrent, wishList }) => {

  console.warn(wishList)


  return (
    <SafeAreaView >
      <View style={{ backgroundColor: 'FFFFF3' }}>
        <FlatList
          data={exhibitionData.records ? exhibitionData.records: wishList}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => {
            return <ExhibitionItem  key={item.id} setCurrent={setCurrent} exhibition={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ExhibitionScreen;
