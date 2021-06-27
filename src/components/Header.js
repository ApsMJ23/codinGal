import React, { useEffect } from 'react'
import { Navbar, Image, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import background from '../images/bg.jpeg'
import Modal from './ModalComponent'

function Header() {
    const [minutes, setMinutes] = React.useState('10')
    const [seconds, setSeconds] = React.useState('00')
    const [counter, setCounter] = React.useState(60000);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        let intervalId;
        if (counter > 0) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = (Math.floor(counter / 60)) % 10;

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setSeconds(computedSecond)
                setMinutes(computedMinute)

                setCounter(counter => counter - 1);
            }, 1000)
        }
        return () => {
            clearInterval(intervalId)
        }

    }, [counter])
    return (
        <Navbar bg='light' expand='sm'>
            <Navbar.Brand>
                <Image
                    src={background}
                    alt='Brand Logo'
                    height='40'
                    width='40'
                    rounded />{'  '}
                <Navbar.Brand className='d-sm-none d-xs-block font-weight-bold'>Codingal</Navbar.Brand>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    className="mr-auto my-2 my-lg-0"
                >
                    <Nav className='mx-2 my-3'>Trial Lesson [Grade 1-3]</Nav>
                    <Nav className='mx-2 my-3'><Link to='/passangers' style={{ color: '#000' }} >Passangers</Link></Nav>
                </Nav>
                <Nav.Item className='mx-2 my-3'>
                    {`${minutes}:${seconds}`}
                </Nav.Item>
                <Button onClick={() => setModalShow(true)} className='mx-2 my-3 btn-bg'>End Class</Button>
                <Modal show={modalShow} onHide={() => setModalShow(false)}></Modal>
            </Navbar.Collapse>

        </Navbar >
    )
}

export default Header
