import { Injectable } from '@angular/core'
import { io, Socket } from 'socket.io-client'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket

  private connectedSubject = new BehaviorSubject<boolean>(false)
  connected$ = this.connectedSubject.asObservable()

  connect(token: string) {
    this.socket = io('http://localhost:3000', {
      auth: { token }
    })

    console.log('socket instance created', this.socket)

    this.socket.on('connect', () => {
      console.log('Socket connected', this.socket.id)
      this.connectedSubject.next(true)
    })

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected')
      this.connectedSubject.next(false)
    })
  }

  on<T>(event: string, callback: (data: T) => void) {
    if (!this.socket) return
    console.log('registro evento', event, this.socket)
    this.socket.on(event, callback)
  }

  off<T>(event: string, callback: (data: T) => void) {
    this.socket.off(event, callback)
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data)
  }

  disconnect() {
    this.socket?.disconnect()
  }
}