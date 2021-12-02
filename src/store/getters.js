const getters = {
  dataUserCurrent: state => state.app.dataUserCurrent,
  dataGroupChatCurrent: state => state.app.dataGroupChatCurrent,
  changeDataGroups: state => state.app.changeDataGroups,
  checkMissMessage: state => state.app.checkMissMessage,
  roomSendMessage: state => state.app.roomSendMessage
}

export default getters
