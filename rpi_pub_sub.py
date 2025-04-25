import paho.mqtt.client as mqtt

# The callback for when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    # Subscribe to the same topic used in your web app
    client.subscribe("ame504/hoverboard/coordinates")

# The callback for when a PUBLISH message is received
def on_message(client, userdata, msg):
    print(f"Received message on {msg.topic}: {msg.payload.decode()}")

# Create an MQTT client instance
client = mqtt.Client()

# Set callback functions
client.on_connect = on_connect
client.on_message = on_message

# Connect to the EMQX broker (via TCP)
client.connect("broker.emqx.io", 1883, 60)

# Blocking loop to maintain connection and listen for messages
client.loop_forever()
