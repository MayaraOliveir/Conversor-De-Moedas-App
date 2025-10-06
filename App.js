import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./App.styles";
import { Button } from "./src/components/Button";
import { Input } from "./src/components/input";
import { ResultCard } from "./src/components/ResultCard";
import { currencies } from "./src/constants/currencies";
import { exchangeRateApi } from "./src/services/api";
import { convertCurrency } from "./src/styles/utils/convertCurrency";
export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const scrollViewRef = useRef(null);
  
  useEffect(() => {
    if (result) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [ result ]);

  async function fetchExchangeRate() {
    try {
      setLoading(true);
      if (!amount) return;
      const data = await exchangeRateApi(fromCurrency);
      const rate = data.rates[toCurrency];
      const convertedAmount = convertCurrency(amount, rate);
      setExchangeRate(rate);
      setResult(convertedAmount);

    } catch (err) {
      alert("Erro, tente novamente");
    } finally {
      setLoading(false);
    }
  }

  function swapCurrency() {
    setfromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult("");
  }
  
  function handleAmountChange(text) {
    setAmount(text);
    setResult(""); // limpa resultado antigo enquanto o usuário digita
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <View style={styles.content}>
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}> Conversor de Moedas</Text>
            <Text style={styles.subTitle}>
              Converta valores entre diferentes moedas
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>
            <View style={styles.currencyGrid}>
              {/*Estrutura padrão que pode ser reutilizada para pegar um array e colocar os itens desse array na tela.*/}
              {currencies.map((currency) => (
                <Button
                  variant="primary"
                  key={currency.code}
                  currency={currency}
                  onPress={() => setfromCurrency(currency.code)}
                  isSelected={fromCurrency === currency.code}
                ></Button>
              ))}
            </View>

            <Input label="Valor: " value={amount} onChangeText={handleAmountChange} />

            <TouchableOpacity style={styles.swapButton} onPress={swapCurrency}>
              <Text style={styles.swapButtonText}>↑↓</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para:</Text>
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button
                  variant="secondary"
                  key={currency.code}
                  currency={currency}
                  onPress={() => setToCurrency(currency.code)}
                  isSelected={toCurrency === currency.code}
                ></Button>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.convertButton,
              (!amount || loading) && styles.convertButtonDisable,
            ]}
            onPress={fetchExchangeRate}
            disabled={!amount || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.swapButtonText}>Converter</Text>
            )}
          </TouchableOpacity>

          <ResultCard
            exchangeRate={exchangeRate}
            result={result}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currencies={currencies}
            />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
