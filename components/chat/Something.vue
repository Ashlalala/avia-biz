<script setup>

function randomName() {
  const adjectives = [
    'autumn', 'hidden', 'bitter', 'misty', 'silent', 'empty', 'dry', 'dark',
    'summer', 'icy', 'delicate', 'quiet', 'white', 'cool', 'spring', 'winter',
    'patient', 'twilight', 'dawn', 'crimson', 'wispy', 'weathered', 'blue',
    'billowing', 'broken', 'cold', 'damp', 'falling', 'frosty', 'green', 'long',
    'late', 'lingering', 'bold', 'little', 'morning', 'muddy', 'old', 'red',
    'rough', 'still', 'small', 'sparkling', 'shy', 'wandering',
    'withered', 'wild', 'black', 'young', 'holy', 'solitary', 'fragrant',
    'aged', 'snowy', 'proud', 'floral', 'restless', 'divine', 'polished',
    'ancient', 'purple', 'lively', 'nameless'
  ];
  const nouns = [
    'waterfall', 'river', 'breeze', 'moon', 'rain', 'wind', 'sea', 'morning',
    'snow', 'lake', 'sunset', 'pine', 'shadow', 'leaf', 'dawn', 'glitter',
    'forest', 'hill', 'cloud', 'meadow', 'sun', 'glade', 'bird', 'brook',
    'butterfly', 'bush', 'dew', 'dust', 'field', 'fire', 'flower', 'firefly',
    'feather', 'grass', 'haze', 'mountain', 'night', 'pond', 'darkness',
    'snowflake', 'silence', 'sound', 'sky', 'shape', 'surf', 'thunder',
    'violet', 'water', 'wildflower', 'wave', 'water', 'resonance', 'sun',
    'wood', 'dream', 'cherry', 'tree', 'fog', 'frost', 'voice', 'paper', 'frog',
    'smoke', 'star'
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const messages = ref([]);
const members = ref([]);
const me = ref({
  "username": randomName(),
  "color": randomColor(),
});

let drone = null;

function connectToScaledrone() {
  drone = new window.Scaledrone('CP97dMHyjwQ5jh5c', {
    data: me.value,
  });
  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    me.value.id = drone.clientId;
  });

  const room = drone.subscribe('observable-room');

  room.on('message', message => {
    const { data, member } = message;
    if (typeof data === 'object' && typeof data.typing === 'boolean') {
      const index = members.value.findIndex(m => m.id === member.id);
      members.value[index].typing = data.typing;
    } else {
      messages.value.push(message)
    }
  });
  room.on('members', newMembers => {
    members.value = newMembers;
  });
  room.on('member_join', member => {
    members.value.push(member);
  });
  room.on('member_leave', ({ id }) => {
    const index = members.value.findIndex(m => m.id === id);
    members.value.splice(index, 1);
  });
}

function onSendMessage(message) {
  drone.publish({
    room: "observable-room",
    message,
  });
}

function onChangeTypingState(typing) {
  drone.publish({
    room: "observable-room",
    message: { typing },
  });
}

onMounted(() => {
  connectToScaledrone();
});
</script>

<template>
  <main class="app">
    <div class="appContent">
      <ChatMembers :members="members" :me="me" />
      <ChatMessages :messages="messages" :me="me" />
      <ChatTypingIndicator :members="members.filter(m => m.typing && m.id != me.id)" />
      <ChatInput :onSendMessage="onSendMessage" :onChangeTypingState="onChangeTypingState" />
    </div>
  </main>
</template>