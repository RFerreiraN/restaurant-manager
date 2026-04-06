import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log('✅ Connected:', socket.id)
})

socket.on('order:new', (data) => {
  console.log('🔥 NEW ORDER:', data)
})

socket.on('connect_error', (err) => {
  console.log('❌ Connection error:', err.message)
})

/*
import { Injectable } from '@angular/core'
import { io, Socket } from 'socket.io-client'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket

  private connectedSubject = new BehaviorSubject<boolean>(false)
  public connected$ = this.connectedSubject.asObservable()

  connect(token: string) {
    this.socket = io('http://localhost:3000', {
      auth: { token }
    })

    this.socket.on('connect', () => {
      console.log('Socket Connected')
      this.connectedSubject.next(true)
    })

    this.socket.on('disconnect', () => {
      console.log('Socket Disconnected')
      this.connectedSubject.next(false)
    })
  }

  onEvent<T>(event: string, callback: (data: T) => void) {
    this.socket.on(event, callback)
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data)
  }

  disconnect() {
    this.socket?.disconnect()
  }

}
*/
