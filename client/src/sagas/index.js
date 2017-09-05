import { watchGetGames, watchDeleteGames, watchSubmitGame, watchUploadPic } from './games'
import { watchAuthentication } from './authentication'

export default function* rootSaga() {
    yield [
        watchGetGames(),
        watchDeleteGames(),
        watchSubmitGame(),
        watchUploadPic(),
        watchAuthentication()
    ]
}
