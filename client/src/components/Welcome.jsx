import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import WelcomeCards from './WelcomeCards.jsx';
import { useNavigate } from 'react-router-dom';

export default function Welcome(){
    const navigate = useNavigate();
    return (
        <>
        <Navbar type={1} />
        <div className='outer-welcome'>
            <div className='welcome-container'>
                <div className='intro-container'>
                    <h1>The most Reliable way to manage agri-food supply chain!</h1>
                    <p>Tamper-proof and transparent supply-chain</p>
                </div>
                <button onClick={()=>navigate('/login')}>Login</button><br></br>
            </div>
        </div>
        <WelcomeCards />
        <Footer />
        </>
    );
}

