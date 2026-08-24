idf_component_register(
  SRCS "buddy_sync.cpp"
  INCLUDE_DIRS "include"
  REQUIRES
    buddy_content
    buddy_domain
    buddy_storage
    esp_http_client
    json
    mbedtls
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
