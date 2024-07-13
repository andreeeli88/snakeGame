import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { Colors } from '../styles/colors';
import Header from './Header';
import Snake from './Snake';
import Food from './Food';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import { checkGameOver } from '../utils/checkGameOver';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import { db } from '../config/Config';
import { ref, set } from 'firebase/database';

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 100, yMin: 0, yMax: 50 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game({ route }: any): JSX.Element {
    const [direction, setDirection] = React.useState<Direction>(Direction.Right);
    const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = React.useState(FOOD_INITIAL_POSITION);
    const [score, setScore] = React.useState<number>(0);

    const { username } = route.params; // Obtener el nombre de usuario de las props de navegación

    React.useEffect(() => {
        if (!isGameOver) {
            const intervalID = setInterval(() => {
                !isPaused && moveSnake();
            }, MOVE_INTERVAL);
            return () => clearInterval(intervalID);
        }
    }, [isGameOver, snake, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead };

        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        }

        switch (direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
            default:
                break;
        }

        if (checkEatsFood(newHead, food, 2)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
            setSnake([newHead, ...snake]);
            const newScore = score + SCORE_INCREMENT;
            setScore(newScore);
            saveScoreToDatabase(newScore, username); // Guardar el score con el nombre de usuario
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }
    };

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.Right);
            } else {
                setDirection(Direction.Left)
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Down);
            } else {
                setDirection(Direction.Up);
            }
        }
    };

    const pauseGame = () => {
        setIsPaused(!isPaused);
    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right);
        setIsPaused(false);
    };

    const saveScoreToDatabase = (score: number, username: string) => {
        set(ref(db, `scores/${username}`), { // Guardar el score con el nombre de usuario como clave
            score: score,
            timestamp: Date.now()
        });
    };

    return (
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={handleGesture}>
                <SafeAreaView style={styles.container}>
                    <Header
                        reloadGame={reloadGame}
                        isPaused={isPaused}
                        pauseGame={pauseGame}
                    >
                        <Text>{score}</Text>
                    </Header>
                    <View style={styles.boundaries}>
                        <Snake snake={snake} />
                        <Food x={food.x} y={food.y} />
                    </View>
                </SafeAreaView>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
   
    },
    boundaries: {
        flex: 1,
        borderWidth: 25,
        borderColor: Colors.primary,
        backgroundColor: Colors.background,
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
    },
});
