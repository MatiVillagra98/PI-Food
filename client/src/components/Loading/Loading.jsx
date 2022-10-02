import loading from './loading.gif'
import './Loading.css'

const Loading = () => {

    return (
        <div className='loading'>
            <img src={loading} alt='LOADING...'/>
        </div>
    );
}

export default Loading;
