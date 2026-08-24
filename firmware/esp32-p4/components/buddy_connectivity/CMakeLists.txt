idf_component_register(
  SRCS "buddy_connectivity.cpp"
  INCLUDE_DIRS "include"
  REQUIRES
    esp_event
    esp_driver_sdmmc
    esp_http_client
    esp_netif
    esp_wifi
    espressif__esp_hosted
    nvs_flash
)

target_compile_features(${COMPONENT_LIB} PUBLIC cxx_std_17)
target_compile_options(${COMPONENT_LIB} PRIVATE
  -std=gnu++17
  -fno-exceptions
  -fno-rtti
  -Wall
  -Wextra
  -Werror
)
