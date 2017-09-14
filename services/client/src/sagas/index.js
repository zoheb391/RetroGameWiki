import { watchGames } from './games'
import { watchAuthentication } from './authentication'

export default function* rootSaga() {
    yield [
        watchGames(),
        watchAuthentication()
    ]
}
