import React, { Fragment, memo, ReactElement } from "react";
import { View, ViewStyle } from "react-native";
import { MaterialIndicator } from "react-native-indicators";

interface LoadingIndicatorProps {
  isLoading: boolean;
  color?: string;
}

export const LoadingIndicator = memo((props: LoadingIndicatorProps): ReactElement => {
  const { isLoading, color = '#F5F5F5' } = props;

  return (
    <Fragment>
      {isLoading && (
        <View style={{ height: 30 } as ViewStyle}>
          <MaterialIndicator size={30} color={color} />
        </View>
      )}
    </Fragment>
  )
});