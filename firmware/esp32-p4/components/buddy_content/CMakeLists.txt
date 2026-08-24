idf_component_register(
  SRCS "buddy_content.cpp"
  INCLUDE_DIRS "include"
  REQUIRES buddy_domain json
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
