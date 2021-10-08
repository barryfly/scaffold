/**
*@description 解决非父子关系组件之间的通信，事件总线
*@author Barry@gmail.com
*@date 2021-10-01
*/

import _ from 'lodash'
function EventBus() {

  this.events = []
}

EventBus.prototype.on = function(eventName,handler) {
  let currentEvent = _.find(this.events,(event)=>{
    return event.name === eventName
  })

  if(_.isEmpty(currentEvent)) {
    this.events.push({
      name: eventName,
      events: [ handler ]
    })
  }else{
    if(_.isArray(currentEvent.events)) {
      currentEvent.events.push(handler)
    }else{
      currentEvent.events = [ handler ]
    }
  }
}

EventBus.prototype.once = function(eventName,handler) {
  let currentEventIndex = _.findIndex(this.events,(event)=>{
    return event.name === eventName
  })

  if(currentEventIndex>-1) {
    this.events[ currentEventIndex ] = {
      name: eventName,
      events: [ handler ]
    }
  }else{
    this.events.push({
      name: eventName,
      events: [ handler ]
    })
  }
}

EventBus.prototype.off = function(eventName,handler) {
  let currentEvent = _.find(this.events,(event)=>{
    return event.name === eventName
  })

  if(_.isEmpty(currentEvent)) {
    console.info(`${eventName} is not register`)
  }else{
    if(_.isFunction(handler)) {
      let index = _.findIndex(currentEvent.events||[],(event)=>{
        return event === handler
      })

      (index>-1) && (currentEvent.events.splice(index,1)) 
    }else{
      currentEvent.events = []
    }
  }
}

EventBus.prototype.emit = function() {
  let params = Array.prototype.slice.call(arguments,0)
  let eventName = params.shift()
  let currentEvent = _.find(this.events,(event)=>{
    return event.name === eventName
  })

  if(_.isEmpty(currentEvent)) {
    console.info(`${eventName} is not register`)
  }else{
    _.each(currentEvent.events,(handler)=>{
      try {
        handler.apply(null,params)
      }catch(e) {
        console.log(e)
      }
    })
  }
}

export default EventBus