import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalNotifications({ isOpen, toggle }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Notifications</ModalHeader>
            <ModalBody>
            LQDTU-JST is a peer-reviewed double-blind journal with international publication code ISSN 1859-0209 for issue of 8 annual editions
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>More Info</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}
