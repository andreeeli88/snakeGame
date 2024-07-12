import { Fragment,  } from "react";
import { Coordinate } from "../types/types";
import { View, StyleSheet } from "react-native";
import { Colors } from "../styles/colors";
interface SnakeProps {
    snake: Coordinate[];
}

export default function Snake({snake}: SnakeProps): JSX.Element{
    return(
        <Fragment>
            {snake.map((segment:any, index: number)=>{
                const segmentStyle = {
                    left: segment.x *10,
                    top: segment.y *10,
                }
                return <View key={index} style={[style.snake, segmentStyle]}></View>
            })}
        </Fragment>
    )
}
const style = StyleSheet.create ({
    snake:{
        width:15,
        height:15,
        borderRadius:7,
        backgroundColor: Colors.primary,
        position: 'absolute',
    }
})