import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';

function ModalComponent(props) {
    const [display, setDisplay] = useState('d-none')
    const [displayText, setDisplayText] = useState('d-none')
    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select a reason to end class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Check type='radio' name='group1' label='Class Completed' />
                <Form.Check type='radio' name='group1' label='Class Interupted/aborted' onClick={() => { setDisplay('d-block') }} />
                <Form.Group className={`${display} ml-3 fgAnimation`}>
                    <Form.Check type='radio' name='group1' label='Student didnt show up for the class' />
                    <Form.Check type='radio' name='group1' label='Student didnt show any interest' />
                    <Form.Check type='radio' name='group1' label='Student got disconnected' />
                    <Form.Check type='radio' name='group1' label='I got disconnected' />
                    <Form.Check type='radio' name='group1' label='Other reason' onClick={() => { setDisplayText('d-block') }} />
                </Form.Group>
                <Form.Control as='textarea' style={{ height: '100px' }} className={`${displayText} ml-3 px-3 fgAnimation`} />
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-left'>
                <Button className='btn-bg '>End Class</Button>
                <Button variant='transparent' >Cancel</Button>
            </Modal.Footer>

        </Modal >
    )
}

export default ModalComponent
