import React, { useEffect, useState} from 'react'
import { Text, View } from 'react-native';
import firebase from '../database/firebase';


const ItemsList = () => {

    const [items, setState] = useState([])

    useEffect(() => {
        firebase.db.collection('anotations').onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                console.log(doc.data)
            })
        })
    }, [])

    return (
        <View>
            <Text>Lista de Items</Text>
        </View>
    )
}

export default ItemsList
