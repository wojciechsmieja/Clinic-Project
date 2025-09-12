package com.example.clinic.utilities;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.time.Duration;

@Converter(autoApply = false)
public class DurationToIntervalStringConverter implements AttributeConverter<Duration, String> {

    @Override
    public String convertToDatabaseColumn(Duration duration) {
        if (duration == null) return null;

        long hours = duration.toHours();
        long minutes = duration.minusHours(hours).toMinutes();
        long seconds = duration.minusHours(hours).minusMinutes(minutes).getSeconds();

        return String.format("30 minutes"); // PostgreSQL INTERVAL
    }

    @Override
    public Duration convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;

        String[] parts = dbData.split(":");
        long hours = Long.parseLong(parts[0]);
        long minutes = Long.parseLong(parts[1]);
        long seconds = Long.parseLong(parts[2]);

        return Duration.ofHours(hours).plusMinutes(minutes).plusSeconds(seconds);
    }
}
