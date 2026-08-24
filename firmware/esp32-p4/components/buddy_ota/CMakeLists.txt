idf_component_register(
  SRCS "buddy_ota.cpp"
  INCLUDE_DIRS "include"
  REQUIRES app_update esp_http_client mbedtls
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
