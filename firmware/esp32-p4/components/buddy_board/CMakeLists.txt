idf_component_register(
  SRCS "buddy_board.cpp"
  INCLUDE_DIRS "include"
  REQUIRES
    esp_hw_support
    esp_mm
    esp_psram
    esp_timer
    nvs_flash
    spi_flash
)

target_compile_features(${COMPONENT_LIB} PRIVATE cxx_std_17)
target_compile_options(${COMPONENT_LIB} PRIVATE
  -std=gnu++17
  -fno-exceptions
  -fno-rtti
  -Wall
  -Wextra
  -Werror
  # The pinned adapter's official C aggregate macro omits newly appended zero
  # fields when consumed from C++; zero initialization remains intentional.
  -Wno-missing-field-initializers
)
