import paho.mqtt.client as mqtt

BROKER = "127.0.0.1"
PORT = 1883

client = mqtt.Client(
    mqtt.CallbackAPIVersion.VERSION2
)


def connect():
    client.connect(
        BROKER,
        PORT,
        60
    )

    return client