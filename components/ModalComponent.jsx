import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';


export const ModalComponent = (props) => {
  const {
    title,
    description,
    isOpenModal,
    onConfirm,
    onCancel,
  } = props;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent
        visible={isOpenModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={[ styles.button, styles.confirmButton ]} onPress={onConfirm}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ styles.button, styles.cancelButton ]} onPress={onCancel}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#313131',
    opacity: '.85',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 3,
    padding: 25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    marginBottom: 28,
    fontSize: 22,
    lineHeight: '24px',
  },
  modalDescription: {
    marginBottom: 25,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    width: 74,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  confirmButton: {
    marginRight: 24,
    backgroundColor: '#0079B8',
  },
  cancelButton: {
    backgroundColor: '#E62700',
  },
  buttonText: {
    color: '#fff',
  },
})