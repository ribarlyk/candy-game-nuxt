
<template>
    <button :class="candyStyleOne">
        <div class="slot-wrapper">
            <slot></slot>
        </div>
    </button>
</template>




<script setup>

const props = defineProps(['type'])

const candyStyleOne = computed(() => {
    return props.type?.color
})
</script>





<style scoped>
* {
    box-sizing: border-box;
}

button {
    width: 79px;
    height:79px;
    color: rgb(122, 76, 76);
    padding: 0;
    border: transparent;
}

.pump {
    transform: scale(1);
    animation: pulse 1s infinite;
    background-color: transparent;
    border: transparent;
}

@keyframes pulse {
    0% {
        transform: scale(0.8);
    }

    70% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.8);
    }
}

.yellow {
    background: url('../assets/yellow_layer3.png');
    background-size: 80px;
    border: 0.5px solid transparent
}

.red {
    background: url('../assets/candy_crush_saga_striped_candy.webp');
    background-size: 80px;

    border: 0.5px solid #ffffff
}

.blue {
    background: url('../assets/Bluecandy_stripedh_snowflake.webp');
    background-size: 80px;

    border: 0.5px solid #ffffff
}

.green {
    background: url('../assets/GreencandyHTML5.webp');
    background-size: 80px;

    border: 0.5px solid transparent
}

.orange {
    background: url('../assets/OrangecandyHTML5.webp');
    background-size: 80px;

    border: 0.5px solid transparent
}

.purple {
    background: url('../assets/166-1666188_candy-pink-candy-clip-art.png');
    background-size: 80px;

    border: 0.5px solid #ffffff
}

.line {
    background: url('../assets/hungry-jacks-1971-logo-E30DCF757E-seeklogo.com.png');
    background-size: 80px;
    
    border: 1px solid transparent;
}


.slot-wrapper {
    color: transparent;
}

</style>