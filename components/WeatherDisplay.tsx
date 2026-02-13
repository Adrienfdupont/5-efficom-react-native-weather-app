import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

interface WeatherData {
  current?: {
    temp_c: number;
    condition: {
      icon: string;
    };
  };
  forecast?: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          icon: string;
        };
      };
    }[];
  };
}

interface WeatherDisplayProps {
  data: WeatherData | null;
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  if (!data || !data.current) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
    >
      {/* Current Weather */}
      <View style={styles.currentWeather}>
        <View style={styles.row}>
          {/*<Image
            source={{ uri: `http:${data.current.condition.icon}` }}
            style={styles.currentIcon}
          />*/}
          <Text style={styles.currentTemperature}>{data.current.temp_c}°C</Text>
        </View>
      </View>

      {/* 7-Day Forecast */}
      {data.forecast && data.forecast.forecastday && (
        <View style={styles.forecastContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.dateColumn]}>
              Date
            </Text>
            <Text style={[styles.tableHeaderText, styles.tempColumn]}>
              Temp.
            </Text>
            <Text style={[styles.tableHeaderText, styles.iconColumn]}>
              Météo
            </Text>
          </View>

          {/* Table Rows */}
          {data.forecast.forecastday.map((day, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.dateColumn]}>
                {formatDate(day.date)}
              </Text>
              <Text style={[styles.tableCell, styles.tempColumn]}>
                {day.day.avgtemp_c}°C
              </Text>
              <View style={styles.iconColumn}>
                <Image
                  source={{ uri: `http:${day.day.condition.icon}` }}
                  style={styles.forecastIcon}
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  currentWeather: {
    alignItems: "center",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentIcon: {
    width: 64,
    height: 64,
  },
  currentTemperature: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  forecastContainer: {
    width: "90%",
    padding: 20,
  },
  forecastTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    paddingBottom: 15,
    marginBottom: 15,
  },
  tableHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
  },
  tableCell: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  dateColumn: {
    flex: 2,
  },
  tempColumn: {
    flex: 1.5,
  },
  iconColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
});
