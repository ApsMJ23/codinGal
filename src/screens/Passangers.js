import React, { useState, useEffect, useRef, useCallback } from 'react'
import 'axios'
import axios from 'axios'
import { Card, Row, Col, Image, Spinner } from 'react-bootstrap';


function Passangers() {
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [passangers, setPassangers] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState()

    const getPassangers = () => {
        setLoading(true)
        axios.get(` https://api.instantwebtools.net/v1/passenger?1page=${page}&size=12`)
            .then(function (response) {
                setHasMore(response.data.data.length > 0)
                setLoading(false)
                setPassangers(passangers => [...passangers, ...response.data.data])
            })
            .catch(function (error) {
                setError(error)
            })
    }
    const observer = useRef()
    const lastPassangerRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(page => page + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])
    useEffect(() => {
        getPassangers()

    }, [page])
    return (
        <div id='myDiv'>
            <Row>
                {passangers.map((passanger, index) => {
                    if (passangers.length == index + 1) {
                        return (
                            <Col md={3} className='m-5' ref={lastPassangerRef}>
                                <Card key={passanger._id} className='h-100'>
                                    <Card.Header>
                                        <Image src={passanger.airline.logo} alt='logo' fluid rounded></Image>
                                    </Card.Header>
                                    <Card.Body>
                                        {passanger.name}
                                        {passanger.airline.name}
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    } else {
                        return (
                            <Col md={3} className='m-5'>
                                <Card key={passanger._id} className='h-100'>
                                    <Card.Header>
                                        <Image src={passanger.airline.logo} alt='logo' fluid rounded></Image>
                                    </Card.Header>
                                    <Card.Body>
                                        {passanger.name}
                                        {passanger.airline.name}
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                })}
            </Row>
            <Row className='justify-content-center'>
                <div>{loading && <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>}</div>
                <div>{error && <h1>{error}</h1>}</div>
            </Row>
        </div >
    )
}

export default Passangers
