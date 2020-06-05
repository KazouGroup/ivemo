<template>
    <footer class="footer">
        <div class=" container-fluid ">
            <nav>
                <ul>
                    <li>
                        <a href="/">
                            Ivemo
                        </a>
                    </li>
                    <li>
                        <a href="/about/">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="http://blog.creative-tim.com">
                            Blog
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="copyright" id="copyright">
                &copy;  {{ new Date().getFullYear() }}, Designed by
                <a href="https://www.invisionapp.com" target="_blank">Ivemo</a>. Coded by
                <a href="https://www.creative-tim.com" target="_blank">KazouGroup</a>.
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "FooterAdmin"
    }
</script>

<style scoped>

</style>
