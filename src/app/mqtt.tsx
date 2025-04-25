import mqtt from 'mqtt';

class MqttService {
  private client: mqtt.MqttClient | null = null
  private baseTopicString: string = 'ame504/hoverboard'
  private topic: string = `${this.baseTopicString}/location`
  private currentLocation: { lat: number; lng: number } | null = null

  connect() {
    const options: mqtt.IClientOptions = {
      clean: true,
      connectTimeout: 4000,
      clientId: 'emqx_test',
      username: 'emqx_test',
      password: 'emqx_test',
    }

    const url = 'wss://broker.emqx.io:8084/mqtt'

    this.client = mqtt.connect(url, options)

    this.client.on('connect', () => {
      console.log('MQTT connected')
      this.client?.subscribe(this.topic)
      this.client?.subscribe(`${this.baseTopicString}/destination`)
      this.startLocationTracking()
    })

    this.client.on('message', (topic, message) => {
      console.log(`MQTT Message [${topic}]:`, message.toString())
    })

    this.client.on('error', (err) => {
      console.error('MQTT Error:', err)
    })
  }

  private startLocationTracking() {
    if (!navigator.geolocation) return;
    navigator.geolocation.watchPosition(
      (position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.client?.publish(this.topic, JSON.stringify(this.currentLocation))
      },
      (error) => {
        console.error('Geolocation error:', error.message)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    )
  }

  publish(topic: string, message: string) {
    this.client?.publish(`${this.baseTopicString}/${topic}`, message)
  }

  disconnect() {
    this.client?.end()
  }
}

export const mqttService = new MqttService()
