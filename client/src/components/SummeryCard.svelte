<script>
    export let value = 0;
    export let mode = "Баланс";
    $: label = mode.toUpperCase();
    $: cssClass = getCssClass(mode)

    function getCssClass(mode) {
        switch (mode) {
            case "Баланс":
                return "is-info";
                break;
            case "Получение":
                return "is-success";
                break;
            case "Затраты":
                return "is-danger";
            default:
                break;
        }
    }
</script>

<div class="notification {cssClass} has-text-centered is-light">
    {label}: <strong>{value}</strong>
</div>