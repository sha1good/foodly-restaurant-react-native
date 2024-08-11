import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { background } from "../../constants/uidata";
import { COLORS, SIZES } from "../../constants/theme";
import RowText from "../../components/RowText";
import ReusableTextInput from "../../components/ReusableInput";
import { WithdrawalStore } from "../../store";
import Button from "../../components/Button";

const Wallet = () => {
  const {
    cardHolder,
    bank,
    account,
    setCardHolder,
    setBank,
    setAccount,
    branch,
    setBranch,
    amount,
    setAmount
  } = WithdrawalStore((state) => ({
    cardHolder: state.cardHolder,
    bank: state.bank,
    account: state.account,
    branch: state.branch,
    amount: state.amount,
    setCardHolder: state.setCardHolder,
    setBank: state.setBank,
    setAccount: state.setAccount,
    setBranch: state.setBranch,
    setAmount: state.setAmount
  }));
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: background,
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={0}
      />
      <View style={{ height: 10 }} />

      <View style={{ marginHorizontal: 12 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: COLORS.offwhite,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <RowText amount={0} subTitle={"Total Orders"} />
          <RowText amount={0} subTitle={"Self Deliveries"} />
          <RowText amount={`$${0}`} subTitle={"WithDrawable"} />
          <RowText amount={`$${0}`} subTitle={"Earnings"} />
        </View>

        <View style={{ height: 10 }} />

        <Text style={{ fontFamily: "medium" }}>WithDraw Detail</Text>

        <View style={{ height: 10 }} />

        <View
          style={{
            justifyContent: "space-between",
            backgroundColor: COLORS.offwhite,
            padding: 10,
            borderRadius: 10,
            height: 400,
          }}
        >
          <ReusableTextInput
            value={cardHolder}
            setValue={setCardHolder}
            placeholder={" Card Holder"}
          />
          <ReusableTextInput
            value={bank}
            setValue={setBank}
            placeholder={"Bank Name"}
          />
          <ReusableTextInput
            value={branch}
            setValue={setBranch}
            placeholder={" Branch name"}
          />
          <ReusableTextInput
            value={account}
            setValue={setAccount}
            placeholder={"Account Number"}
          />

          <ReusableTextInput
            value={amount}
            setValue={setAmount}
            placeholder={"Amount"}
          />

          <Button  isValid={true} title={"R  E  Q  U  E  S  T"}/>
        </View>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
