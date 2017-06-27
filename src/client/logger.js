export default (app) => {
  app.use((state, emitter) => {
    emitter.on('*', function (messageName, data) {
      console.log('event', messageName, data)
    })
  })
}
