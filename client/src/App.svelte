<script>
    import axios from "axios";
    import { onMount } from "svelte";

    let input = '';
    let typeOfTransaction = "+";
    let transactions = [];

    $: disabled = !input
    $: balance = transactions.reduce((acc, t) => acc + t.value , 0)

    onMount(async () => {
        const { data } = await axios.get("api/transactions");

        transactions = data;
    });

    async function addTransaction() {
        const transaction = {
            date: new Date().getTime(),
            value: (typeOfTransaction === "+") ? input : input * -1
        };

        const response = await axios.post("api/transactions", transaction);

        transactions = [...transactions, response.data];
        input = '';
    }

    function onKeyPress(e) {
        if (input === 0) return
        if (e.charCode === 13) addTransaction()
    }

    async function removeTransaction(id) {
        const response = await axios.delete("/api/transactions/" + id);

        if (response.data.id === id) {
            transactions = transactions.filter(t => t._id !== id)
        }
    }
</script>

<div class="app container">
    <div class="field has-addons">
        <p class="control">
            <span class="select">
                <select bind:value={typeOfTransaction}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                </select>
            </span>
        </p>
        <p class="control is-expanded">
            <input class="input" type="number" min="0" on:keypress={onKeyPress} bind:value={input} placeholder="Сумма денег" />
        </p>
        <p class="control">
            <button class="button" on:click={addTransaction} {disabled}> Сохранить </button>
        </p>
    </div>
    <div class="notification is-info is-lignt has-text-centered">
        Баланс: <strong>{balance}</strong>
    </div>
    <hr />
    {#each transactions as transaction (transaction._id)}
    <div class="notification is-lignt {transaction.value > 0 ? 'is-success' : 'is-danger'}">
        {transaction.value}
        <button class="delete" on:click={() => removeTransaction(transaction._id) } />
    </div>
    {/each}
</div>

{(console.log(typeOfTransaction, input), '')}

<style>
    .app {
        margin: 40px auto;
        max-width: 500px !important;
    }
</style>