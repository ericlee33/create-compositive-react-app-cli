import axios from '../utils/o-axios'

class Misc {
    getSmsCode = (data) => {
        return axios.post('/v1/misc/send_cc', {
            data,
        });
    }
}

export default new Misc()


