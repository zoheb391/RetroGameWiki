import { watchGetGames, watchDeleteGames, watchSubmitGame, watchUploadPic } from './games'

export default function* rootSaga() {
    yield [
        watchGetGames(),
        watchDeleteGames(),
        watchSubmitGame(),
        watchUploadPic()
    ]
}
