<template>
<body>

    <section class="heroimage">
        <div class="d-flex flex-column align-items-center justify-content-center container-fluid">
            <h1 class="text-center">Bently Adventures</h1>
            <a href="/" class="btn btn-primary btn-large">Begin your adventure »</a>
        </div>
    </section>
</body>
</template>

<style>
.heroimage {
    display: flex;
    width:100vw;
    height: calc(100vh - 56px);
    background: url("../assets/hero.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    background-attachment: fixed;
  }

.heroimage h1 {
    font-size: 50px;
    font-weight: 700;
    color:white;
}
</style>