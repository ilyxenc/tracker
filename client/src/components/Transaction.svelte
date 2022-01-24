<script>
    import { slide } from "svelte/transition";
    export let transaction;
    export let removeTransaction;
</script>

<div class="notification {transaction.value > 0 ? 'is-success' : 'is-danger'} is-light" transition:slide={{duration: 300}}>
    {transaction.value}
    <span class="is-size-7 has-text-grey date">
        {new Date(transaction.date).toLocaleString()}
    </span>
    <button class="delete" on:click={() => removeTransaction(transaction._id) } />
</div>

<style>
    .date {
        float: right;
    }
</style>