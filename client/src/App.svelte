<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { 
        transactions, 
        sortedTransactions, 
        balance, 
        income, 
        expenses 
    } from "./stores.js";
    
    import Transaction from "./components/Transaction.svelte";
    import SummaryCard from "./components/SummeryCard.svelte";
    import Loading from "./components/Loading.svelte";

    let input = '';
    let typeOfTransaction = "+";
    let loading = false;

    $: disabled = !input;

    onMount(async () => {
        loading = true;
        const { data } = await axios.get("api/transactions");

        $transactions = data;
        loading = false;
    });

    async function addTransaction() {
        const transaction = {
            date: new Date().getTime(),
            value: (typeOfTransaction === "+") ? input : input * -1
        };

        const response = await axios.post("api/transactions", transaction);

        $transactions = [...$transactions, response.data];
        input = '';
    }

    function onKeyPress(e) {
        if (input === 0) return
        if (e.charCode === 13) addTransaction()
    }

    async function removeTransaction(id) {
        const response = await axios.delete("/api/transactions/" + id);

        if (response.data.id === id) {
            $transactions = $transactions.filter(t => t._id !== id)
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
    {#if loading}
    <Loading />
    {/if}

    {#if $transactions.length > 0}
    <SummaryCard mode="Баланс" value={$balance} />
    <div class="columns">
        <div class="column">
            <SummaryCard mode="Получение" value={$income} />
        </div>
        <div class="column">
            <SummaryCard mode="Затраты" value={$expenses} />
        </div>
    </div>
    <hr />
    {:else if !loading}
    <div class="notification">
        Добавьте первую транзакцию
    </div>
    {/if}
    {#each $sortedTransactions as transaction (transaction._id)}
    <Transaction {transaction} {removeTransaction} />
    {/each}
</div>

{(console.log(typeOfTransaction, input), '')}

<style>
    .app {
        margin: 40px auto;
        max-width: 500px !important;
    }
</style>