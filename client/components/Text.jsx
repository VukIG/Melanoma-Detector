import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Text() {
  return (
    <View>
        <Text styles={styles.heading}>Let's start!</Text>
        <Text styles={styles.bodyText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, 
            maiores quibusdam tempore saepe qui delectus assumenda rerum, perferendis 
            doloribus maxime eum facilis! Nostrum velit minus iure quibusdam repellat hic veritatis.
        </Text>
    </View>
  )
}

export default Text;

const styles = StyleSheet.create({
    heading:{
        textAlign:'center',
        color:'teal',
        paddingBottom:'6',
        fontWeight:'800',
        fontSize:'4',
    },
    bodyText:{
        textAlign:'center',
        marginBottom:'10'
    }
});