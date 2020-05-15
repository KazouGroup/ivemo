<template>
    <footer class="footer">
        <div class="container-fluid">
            <nav class="float-left">
                <ul>
                    <li>
                        <a href="https://www.creative-tim.com">
                            Creative Tim
                        </a>
                    </li>
                    <li>
                        <a href="https://creative-tim.com/presentation">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="http://blog.creative-tim.com">
                            Blog
                        </a>
                    </li>
                    <li>
                        <a href="https://www.creative-tim.com/license">
                            Licenses
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="copyright float-right">
                &copy;  {{ new Date().getFullYear() }}, Designed by
                <a href="https://www.invisionapp.com" target="_blank">Invimo</a>. Coded by
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
